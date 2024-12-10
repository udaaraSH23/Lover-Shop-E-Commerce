package com.example.backend.Auth.security;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jwt.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;



    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    /**
     * Generate JWT token with email and role
     */
    public String generateToken(String userId,String email, String role) {
        try {
            // Create JWT claims
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(email)
                    .claim("userId",userId)
                    .claim("role", role)
                    .issueTime(new Date())
                    .expirationTime(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .build();

            // Create the signing key and signer
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            JWSSigner signer = new MACSigner(secretKey);

            // Create the JWT with the claims and sign it
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader.Builder(JWSAlgorithm.HS256).build(),
                    claimsSet
            );

            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (Exception e) {
            throw new RuntimeException("Error while generating JWT", e);
        }
    }

    /**
     * Parse and validate token
     */
    public String extractUsername(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

            if (signedJWT.verify(verifier)) {
                return signedJWT.getJWTClaimsSet().getSubject();
            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
        return null;
    }

    /**
     * Validate token expiration
     */
    public boolean isTokenExpired(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getExpirationTime().before(new Date());
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
    }

    public byte[] getSecretKeyBytes() {
    return SECRET_KEY.getBytes();
}

}
