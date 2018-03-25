package com.leo_sanchez.columbiatennisladder.Registration;

import android.accounts.AccountsException;
import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.TextView;
import android.widget.Toast;

import com.leo_sanchez.columbiatennisladder.ApplicationLogic.AccountLogic;
import com.leo_sanchez.columbiatennisladder.ApplicationLogic.IAccountLogic;
import com.leo_sanchez.columbiatennisladder.Main.MainActivity;
import com.leo_sanchez.columbiatennisladder.Models.AuthenticationResult;
import com.leo_sanchez.columbiatennisladder.R;

public class RegisterActivity extends AppCompatActivity {

    IAccountLogic accountLogic;

    public RegisterActivity(){
        //TODO: Research Depenency Injection on Android...
        this.accountLogic = new AccountLogic();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
    }

    protected void register(View view){
        closeKeyboard(view);
        String email = ((TextView) findViewById(R.id.userName)).getText().toString();
        String password = ((TextView) findViewById(R.id.etPassword)).getText().toString();

        if(email.isEmpty()|| email == null || password.isEmpty() || password == null){
            Toast.makeText(getApplicationContext(), "Please enter your information", Toast.LENGTH_SHORT).show();
            return;
        }

        AuthenticationResult authenticationResult = new AuthenticationResult();

        try{
            authenticationResult = accountLogic.RegisterAccount(email, password);
        }
        catch(Exception exception) {
            //TODO: Research exception handling and login.
        }

        if(authenticationResult.isAuthenticated == false){
            handleErrorAuthentication(authenticationResult);
        } else {
            Intent i = new Intent(getApplicationContext(),MainActivity.class);
            startActivity(i);
        }
    }

    private void closeKeyboard(View view){
        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

    private void handleErrorAuthentication(AuthenticationResult authenticationResult) {
        Toast.makeText(getApplicationContext(), authenticationResult.errorMessage, Toast.LENGTH_LONG).show();
    }
}
