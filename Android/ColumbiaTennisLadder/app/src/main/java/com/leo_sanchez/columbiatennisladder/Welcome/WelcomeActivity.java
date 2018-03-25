package com.leo_sanchez.columbiatennisladder.Welcome;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.leo_sanchez.columbiatennisladder.Login.LoginActivity;
import com.leo_sanchez.columbiatennisladder.R;
import com.leo_sanchez.columbiatennisladder.Registration.RegisterActivity;

public class WelcomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
    }

    protected void goToLogin(View view){
        Intent i = new Intent(getApplicationContext(),LoginActivity.class);
        startActivity(i);
    }

    protected void goToRegister(View view){
        Intent i = new Intent(getApplicationContext(),RegisterActivity.class);
        startActivity(i);
    }
}
