exports.createUserSession = async (req, res) => {
    log.info('createUserSession called');
    const user = await userService.getUserByEmails(req.userDetails.email); 
    if (!user) {
        return res.redirect (302, `${process.env.DOMAIN_URL}/validate-sso-token?error=User Not registered with App`);
    }
    const ssoResponse = loginDto.createSSORespSameAsDeep(req.userDetails, user); 
    const session = await sessionService.createSession(user, null, false, req.deviceInfo, true, ssoResponse); 
    const token = cassandrautil.generateTimeuuid(); 
    await redisUtil.save(token, session.data, 60); 
    res.cookie('Authorization', session); 
    return res. redirect (302, `${process.env.DOMAIN_URL}/validate-sSo-token?token=${token}`);
}