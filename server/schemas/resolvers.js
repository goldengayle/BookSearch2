const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },

          users: async () => {
            return User.find({}).populate('savedBooks')
          }

    },
    Mutation:{
        loginUser: async(parent, { email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError(`No user with this email found!`)
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw){
                throw new AuthenticationError(`Incorrect password`);
            }

            const token =signToken(user);
            return { token, user};
        },
        addUser: async(parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(username);

            return {token, user}
        },
        saveBook: async (parent, { input }, context) => {
            console.log(context.user)
            console.log(input.bookId)
            if (context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $push: { savedBooks: {input} }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedUser
            }

            throw new AuthenticationError(`You need to be logged in!`)
        },

        removeBook: async (parent, { book }, context) => {
            if (context.user){
                return User.findOneAndUpdate(
                    { _id:context.user._id },
                    { $pull: {savedBooks: book}},
                    {new:true}
                );
            }
                throw new AuthenticationError('You need to be logged in!')
            },
        },

    }

module.exports = resolvers;