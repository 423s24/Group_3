import { JsonWebTokenError, JwtPayload, sign, verify } from "jsonwebtoken"

class Token {
    private readonly expiresIn: string = process.env.TOKEN_EXPIRES_IN || '1h';
    private readonly secret: string = process.env.JWT_SECRET || 'abcdefghijklmnopqrstuvwxyz1234567890';

    private token: string;

    constructor() {
    }

    /**
     * Signs a payload with the secret and returns the token
     * @param payload the payload to sign
     * @returns the token as a string
     */
    public sign(payload: any): string {
        this.token = sign(payload, this.secret, { expiresIn: this.expiresIn });

        return this.token;
    }

    /**
     * Verifies a token and returns the payload
     * @param token the token to verify
     * @returns the payload as a string
     */
    public verify(token: string): JwtPayload {
        return verify(token, this.secret) as JwtPayload;
    }

    /**
     * Returns the token
     * @returns the token as a string
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Returns true if the token is valid, false otherwise
     * @returns true if the token is valid, false otherwise
     */
    public isValid(): boolean {
        let isValid = false
        if (verify(this.token, this.secret)) {
            isValid = true;
        } else {
            isValid = false;
            throw new JsonWebTokenError("Invalid Json Web Token");
        }

        return isValid;
    }
}

export default Token;