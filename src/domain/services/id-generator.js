/**
 * Id generator Service
 * @param {function} uuidv4 - The package to generate a mongo id
 * @return {{generate: (function(): *)}}
 * @constructor
 * @memberOf Entity.Services
 */
const idGenerator = ({uuidv4}) => {
    return  {
        /**
         * Function to generate an id
         * @return {String} the id generated
         * @memberOf Entity.Services.idGenerator
         */
        generate: () => uuidv4(),
    }
}

module.exports = idGenerator;