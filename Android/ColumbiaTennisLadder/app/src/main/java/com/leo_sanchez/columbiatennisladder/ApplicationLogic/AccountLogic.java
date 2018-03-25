package com.leo_sanchez.columbiatennisladder.ApplicationLogic;

import android.widget.Toast;

import com.leo_sanchez.columbiatennisladder.Models.AuthenticationResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * Created by ldjam on 3/24/2018.
 */

public class AccountLogic implements IAccountLogic {

    Random random;
    String[] errorMessages;

    public AccountLogic(){
        random = new Random();

        errorMessages = new String[]{
                "Sorry, Chuck Norris doesn't allow this email!",
                "Your email contains the word invalid.",
                "Our manical gnomes are kinda busy at the moment",
                "NO!, bad email, baaaad email!",
                "This is a test error message"
        };

    }

    @Override
    public AuthenticationResult RegisterAccount(String email, String password) {
        return WaitASecond(email, password);
    }

    @Override
    public AuthenticationResult LogIn(String email, String password) {
        return WaitASecond(email, password);
    }

    private AuthenticationResult WaitASecond(String email, String password){
        AuthenticationResult result = new AuthenticationResult();
        result.isAuthenticated = false;

        if(email.isEmpty()|| email == null || password.isEmpty() || password == null){
            result.errorMessage = "Invalid credentials";
            return result;
        }

        result.email = email;

        if(email.contains("invalid")){
            int randomError = random.nextInt(errorMessages.length);
            result.errorMessage = errorMessages[randomError];
            return result;
        }

        result.isAuthenticated = true;
        return result;
    }
}
