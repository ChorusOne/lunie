const {
  buildNodes,
  startNodes
} = require(`../../tasks/build/local/helper`)
const {
  cliBinary,
  nodeBinary
} = require(`../../tasks/gaia.js`)
const { join } = require(`path`)

const testDir = join(__dirname, `..`, `..`, `testArtifacts`)

module.exports = {
  // controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout : 30000,

  async before(done) {
    await bootLocalNetwork(testDir, {
      chainId: `test_chain`,
      overwrite: true,
      moniker: `local`
    })

    done()
  },
  beforeEach(browser, done) {
    browser
      .url(browser.launch_url)
      .execute(function() {
        window.localStorage.setItem(`keys`, JSON.stringify([{ name:`rich_account`,address:`cosmos1ek9cd8ewgxg9w5xllq9um0uf4aaxaruvcw4v9e`,wallet:`ae1d20a49e1085cca29a71e270c6f64f8f86794cb67c6922caea6bcba0ed9e60g+nSTgP8/wHpWaomDkhW/7g2Xldvno3VRFggvdpWIDrRV+n4BJtpk3UpLKo0K3SDL5dRzxz3NmGFnSA8znggFmtesdqu6jWJYzSNqaQhM/gCPTVabF7t1UHaybze1NRlYcm/wl5oOyXRpki6ugOHxNhF7+4wlzhYxMilAB7ekDB4+VVHoPMUinU4dsUdtC4XwDUA0rbX1TTmrh+i1eBp6UTQ+nHGiZXL1TkhhR1mE0fR3bLRunz5XagYtjoST33pecQWzqeaZZQ/mgm9QXu/i+ymfbnPQkh8ivx+J6/d2RfZuAV4NnwFZDUr7CzPX4TU` }]))
        return true
      }, [])
    done()
  },
  /**
     * After all the tests are run, evaluate if there were errors and exit appropriately.
     *
     * If there were failures or errors, exit 1, else exit 0.
     *
     * @param results
     */
  reporter: function(results) {
    if ((typeof(results.failed) === `undefined` || results.failed === 0) &&
        (typeof(results.error) === `undefined` || results.error === 0)) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  }
}

const bootLocalNetwork = async (targetDir, options) => {
  console.log(`using cli binary`, cliBinary)
  console.log(`using node binary`, nodeBinary)

  const { nodes, cliHomePrefix, mainAccountSignInfo } = await buildNodes(
    targetDir,
    options,
    3,
    true
  )

  console.log(`Done with initialization, start the nodes`)

  await startNodes(nodes, mainAccountSignInfo, options.chainId)

  console.log(`Declared secondary nodes to be validators.`)

  return {
    cliHomePrefix,
    ...nodes[1]
  }
}
