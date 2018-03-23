package com.example.diceouttesttutorial;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

/**
 * Created by ldjam on 3/23/2018.
 */

public class RollingLogic implements IRollingLogic {
    @Override
    public int getRollScore(ArrayList<Integer> dice) {

        int maxNumberOfOccurrences = 0;

        for(int die : dice){
            int occurrences = Collections.frequency(dice, die);
            if(occurrences > maxNumberOfOccurrences){
                maxNumberOfOccurrences = occurrences;
            }
        }

        if(maxNumberOfOccurrences == 3){
            return dice.get(0) * 100;
        }

        if(maxNumberOfOccurrences == 2){
            return 50;
        }

        return Collections.max(dice);
    }
}
