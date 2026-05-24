import { decodeToken, isExpired } from 'react-jwt';

export class JwtModule {
  decode(jwt: string) {
    return decodeToken(jwt);
  }

  isTokenExpired(jwt: string) {
    return isExpired(jwt);
  }

  verify(jwt: string) {
    const decoded = decodeToken(jwt);
    const expired = isExpired(jwt);
    return { status: !expired, decoded };
  }
}
