import Base from '@/utils/commands/_base'

describe('valid', () => {
  it('should return true if id is defined', () => {
    expect(new Base({ id: 'base' }).valid).toBeTruthy()
  })
  it('should return false if id is not defined', () => {
    expect(new Base().valid).toBeFalsy()
  })
})
