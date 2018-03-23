package com.example.diceouttesttutorial;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Random;

public class MainActivity extends AppCompatActivity {

    TextView rollResult;

    TextView topRollText;

    TextView scoreText;

    int tries;

    int score;

    int topRoll;

    ArrayList<Integer> dice;
    ArrayList<ImageView> diceImages;

    Random rand;

    IRollingLogic rollingLogic;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                rollDice(view);
            }
        });

        score = 0;
        topRoll = 0;
        tries = 0;

        rollResult = findViewById(R.id.rollResult);
        topRollText = findViewById(R.id.topRoll);
        scoreText = findViewById(R.id.scoreText);

        rand = new Random();

        dice = new ArrayList<Integer>();

        diceImages = new ArrayList<ImageView>();
        diceImages.add((ImageView) findViewById(R.id.dice1Image));
        diceImages.add((ImageView) findViewById(R.id.dice2Image));
        diceImages.add((ImageView) findViewById(R.id.dice3Image));

        rollingLogic = new RollingLogic();
    }

    public void rollDice(View v){
        dice.clear();

        for (int i = 0 ; i < 3 ; i++){
            int die = rand.nextInt(6) +1;
            dice.add(die);
            updateDieImage(i, die);
        }

        int rollScore= rollingLogic.getRollScore(dice);
        rollResult.setText("You scored " + rollScore);

        score += rollScore;

        scoreText.setText("Score: " + score);

        handleRollMessage(rollScore);
    }

    private void updateDieImage(int imageNumber, int die) {
        String imageId="die_" + die;
        int image = getResources().getIdentifier(imageId, "drawable", getPackageName());
        diceImages.get(imageNumber).setImageResource(image);
    }

    private void handleRollMessage(int roll) {
        if(roll > topRoll){

            String message = "New Top Roll!";

            if(roll >= 100){
                message += " and it's a Triple!";
            } else if (roll > 18) {
                message += " and it's a Double!";
            }

            Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
            topRoll = roll;
            topRollText.setText("Top Roll: " + topRoll);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
