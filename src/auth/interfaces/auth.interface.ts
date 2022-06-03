export interface IAuthService {
  signUp(createUserDto: any);
  signIn(authCredentialsDto: any);
}
