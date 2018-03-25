package com.leo_sanchez.columbiatennisladder.Main;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ListView;

import com.leo_sanchez.columbiatennisladder.Adapters.LadderPositionsListAdapter;
import com.leo_sanchez.columbiatennisladder.ApplicationLogic.ILadderLogic;
import com.leo_sanchez.columbiatennisladder.ApplicationLogic.LadderLogic;
import com.leo_sanchez.columbiatennisladder.Models.Player;
import com.leo_sanchez.columbiatennisladder.R;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    ILadderLogic ladderLogic;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ladderLogic = new LadderLogic();

        List<Player> players = ladderLogic.getAllPlayers();

        ListView ladderPositions = (ListView) findViewById(R.id.ladderPositions);

        // get data from the table by the ListAdapter
        LadderPositionsListAdapter customAdapter = new LadderPositionsListAdapter(this, R.layout.player_position, players);

        ladderPositions.setAdapter(customAdapter);
    }
}
