import loginMode from '../reducers/loginModeReducer'

describe('Testing login reducer', () => {

  test('should have correct default state', () => {
    expect(loginMode(undefined, {})).toEqual('login')
  })

  test('should set state to login with login action', () => {
    expect(loginMode(undefined, { type: 'SET_TO_LOGIN_MODE' })).toEqual('login')
  })

  test('should set state to register with register action', () => {
    expect(loginMode('login', { type: 'SET_TO_REGISTER_MODE'})).toEqual('register')
  })

})
