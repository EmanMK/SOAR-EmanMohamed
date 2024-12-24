module.exports = class User { 

    constructor({utils, cache, config, cortex, managers, validators, mongomodels }={}){
        this.config              = config;
        this.cortex              = cortex;
        this.validators          = validators; 
        this.mongomodels         = mongomodels;
        this.tokenManager        = managers.token;
        this.usersCollection     = "users";
        this.httpExposed         = ['createSuperAdmin','createSchoolAdmin'];
    }

    async createSuperAdmin({username, email, password}){
        const user = {username, email, password};

        // Data validation
        let result = await this.validators.user.createSuperAdmin(user);
        if(result) return result;
        
        // Creation Logic
        let createdUser     = {username, email, password}
        let longToken = this.tokenManager.genLongToken({ role: 'SUPER_ADMIN', userId: createdUser._id, userKey: createdUser.key });
        
        // Response
        return {
            user: createdUser, 
            longToken 
        };
    }
    //

    async createSchoolAdmin({username, email, password}){
        const user = {username, email, password};

        // Data validation
        let result = await this.validators.user.createSchoolAdmin(user);
        if(result) return result;
        
        // Creation Logic
        let createdUser     = {username, email, password}
        let longToken = this.tokenManager.genLongToken({ role: 'SCHOOL_ADMIN', userId: createdUser._id, userKey: createdUser.key });
        
        // Response
        return {
            user: createdUser, 
            longToken 
        };
    }

}
