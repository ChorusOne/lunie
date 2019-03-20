import num from "renderer/scripts/num"

describe(`number helper`, () => {
  it(`should format numbers showing many decimals`, () => {
    expect(num.full(1001950.123456)).toBe(`1,001,950.123456`)
  })

  it(`should format numbers showing many decimals`, () => {
    expect(num.shortNumber(1.123456789)).toBe(`1.1235…`)
  })

  it(`should format numbers showing few decimals`, () => {
    expect(num.pretty(1001950.123456)).toBe(`1,001,950.12`)
  })

  it(`should format numbers showing no decimals`, () => {
    expect(num.prettyInt(1001950.123456)).toBe(`1,001,950`)
  })

  it(`should format percent without decimals`, () => {
    expect(num.percentInt(0.2612)).toBe(`26%`)
  })

  it(`should format percent with decimals`, () => {
    expect(num.percent(0.2612)).toBe(`26.12%`)
  })

  it(`should format long decimals well`, () => {
    expect(num.prettyDecimals(1e-8)).toBe(`0.00000001`)
  })

  it(`should format long decimals well if whole number`, () => {
    expect(num.prettyDecimals(12)).toBe(`12`)
  })

  it(`should convert utam denom to atom denom`, () => {
    expect(num.viewDenom(`uatom`)).toBe(`atom`)
  })

  it(`should convert SDK coins to view coins`, () => {
    expect(num.viewCoin({
      denom: `uatom`,
      amount: 1000000
    })).toEqual({
      denom: `atom`,
      amount: `1.000000`
    })
  })
})
