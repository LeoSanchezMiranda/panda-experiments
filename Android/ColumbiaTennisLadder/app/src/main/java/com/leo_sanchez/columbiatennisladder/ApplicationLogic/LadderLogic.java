package com.leo_sanchez.columbiatennisladder.ApplicationLogic;

import com.leo_sanchez.columbiatennisladder.Models.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by ldjam on 3/24/2018.
 */

public class LadderLogic implements ILadderLogic {

    Random random;
    String[] firstNames;
    String[] lastNames;

    public LadderLogic(){
        random = new Random();
        firstNames = new String[]{"Leo", "ALex", "Jaime", "Ädam", "Dan", "Corey", "Paul", "Shawn", "Nick", "Mal", "Pedro", "Juan", "Brandy", "Sam", "Joe", "Brandon"};
        lastNames = new String[]{"Smith", "Sanchez", "McClain", "Miranda", "Garcia", "Flatow", "Rosen", "Norris"};
    }

    @Override
    public List<Player> getAllPlayers() {

        List<Player> players = generateRandomListOfPlayers(70);

        return players;
    }

    private List<Player> generateRandomListOfPlayers(int numberOfPlayers) {

        List<Player> players = new ArrayList<Player>();

        for(int i = 0 ; i < numberOfPlayers ; i++){
            players.add(createRandomPlayer(i + 1));
        }

        return players;
    }

    private Player createRandomPlayer(int position){
        int firstNameRandom = random.nextInt(firstNames.length);
        int lastNameRandom = random.nextInt(lastNames.length);
        return new Player(firstNames[firstNameRandom], lastNames[lastNameRandom], position);
    }


}
