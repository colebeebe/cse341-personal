import { HeaderMap } from '@apollo/server';
import { IncomingHttpHeaders } from 'http';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import getDB from '../models/db.js';

import { PassportStatic } from 'passport';
import { ObjectId } from 'mongodb';

// Extend Express.User
declare global {
  namespace Express {
    interface User {
      _id: ObjectId;
    }
  }
}

export function toHeaderMap(headers: IncomingHttpHeaders) {
  const map = new HeaderMap();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      for (const v of value) map.set(key, v);
    } else if (value !== undefined) {
      map.set(key, value);
    }
  }

  return map;
}

export function passportConfig(passport: PassportStatic) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          image: profile.photos?.[0].value,
        };

        try {
          const db = getDB();
          const collection = db.collection('users');
          let user = await collection.findOne({ googleId: profile.id });

          if (!user) {
            const result = await collection.insertOne(newUser);
            user = { ...newUser, _id: result.insertedId };
          }

          done(null, user);
        } catch (err: any) {
          console.error(err);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const db = getDB();
      const collection = db.collection('users');
      const user = await collection.findOne({ _id: id });

      done(null, user);
    } catch (err: any) {
      done(err);
    }
  });
}
