package com.leo_sanchez.columbiatennisladder.ApplicationLogic;

import com.leo_sanchez.columbiatennisladder.Models.AuthenticationResult;

/**
 * Created by ldjam on 3/24/2018.
 */

public interface IAccountLogic {
    AuthenticationResult RegisterAccount(String email, String password);
    AuthenticationResult LogIn(String email, String Password);
}
