const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    const userData = await User.findById(context.user._id).populate('savedBooks');
                    return userData;
                } catch (err) {
                    console.error(err);
                    throw new AuthenticationError('Cannot find user data');
                }
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.error(err);
                throw new AuthenticationError('Failed to create user');
            }
        },
        login: async (parent, { email, password }) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    throw new AuthenticationError('Incorrect credentials');
                }

                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new AuthenticationError('Incorrect credentials');
                }

                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.error(err);
                throw new AuthenticationError('Login failed');
            }
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                try {
                    const updatedUser = await User.findByIdAndUpdate(
                        context.user._id,
                        { $addToSet: { savedBooks: book } },
                        { new: true }
                    ).populate('savedBooks');
                    return updatedUser;
                } catch (err) {
                    console.error(err);
                    throw new AuthenticationError('Failed to save book');
                }
            }
            throw new AuthenticationError('You need to be logged in');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                try {
                    const updatedUser = await User.findByIdAndUpdate(
                        context.user._id,
                        { $pull: { savedBooks: { bookId: bookId } } },
                        { new: true }
                    ).populate('savedBooks');
                    return updatedUser;
                } catch (err) {
                    console.error(err);
                    throw new AuthenticationError('Failed to remove book');
                }
            }
            throw new AuthenticationError('You need to be logged in');
        }
    }
};

module.exports = resolvers;