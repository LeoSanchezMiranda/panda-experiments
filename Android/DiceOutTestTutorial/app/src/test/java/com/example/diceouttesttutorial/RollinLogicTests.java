package com.example.diceouttesttutorial;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Random;

import static org.junit.Assert.*;

public class RollinLogicTests {

    IRollingLogic sut = new RollingLogic();
    ArrayList<Integer> dice = new ArrayList<Integer>();
    Random random = new Random();

    @Test
    public void ThreeOnesWillScoreOneHundred() {

        dice.clear();
        dice.add(1);
        dice.add(1);
        dice.add(1);

        int result = sut.getRollScore(dice);

        assertEquals(100, result);
    }

    @Test
    public void ThreeTwosWillScoreTwoHundred() {

        dice.clear();
        dice.add(2);
        dice.add(2);
        dice.add(2);

        int result = sut.getRollScore(dice);

        assertEquals(200, result);
    }

    @Test
    public void ThreeThreesWillScoreThreeHundred() {

        dice.clear();
        dice.add(3);
        dice.add(3);
        dice.add(3);

        int result = sut.getRollScore(dice);

        assertEquals(300, result);
    }

    @Test
    public void ThreeFoursWillScoreFourHundred() {

        dice.clear();
        dice.add(4);
        dice.add(4);
        dice.add(4);

        int result = sut.getRollScore(dice);

        assertEquals(400, result);
    }

    @Test
    public void ThreeFivesWillScoreFiveHundred() {

        dice.clear();
        dice.add(5);
        dice.add(5);
        dice.add(5);

        int result = sut.getRollScore(dice);

        assertEquals(500, result);
    }

    @Test
    public void ThreeSixesWillScoreSixHundred() {

        dice.clear();
        dice.add(6);
        dice.add(6);
        dice.add(6);

        int result = sut.getRollScore(dice);

        assertEquals(600, result);
    }

    @Test
    public void AnyThreeInstancesOfTheSameNumberWillResultInThatNumberTimesOneHundred() {

        int number = random.nextInt(100);

        dice.clear();
        dice.add(number);
        dice.add(number);
        dice.add(number);

        int result = sut.getRollScore(dice);

        int expectedResult = number * 100;

        assertEquals(expectedResult, result);
    }

    @Test
    public void AnyTwoOfTheSameNumberAndAnotherNumberWillScoreFifty() {

        int numberA = random.nextInt(100) + 2;
        int numberB = numberA - 1;

        dice.clear();
        dice.add(numberA);
        dice.add(numberB);
        dice.add(numberA);

        int result = sut.getRollScore(dice);

        assertEquals(50, result);
    }

    @Test
    public void WhenAllNumbersAreDifferentScoreWillBeTheHighestNumber() {

        int numberMin = random.nextInt(10) + 1;
        int numberMid = numberMin + random.nextInt(10);
        int numberMax = numberMid + random.nextInt(10);

        dice.clear();
        dice.add(numberMin);
        dice.add(numberMid);
        dice.add(numberMax);

        int result = sut.getRollScore(dice);

        assertEquals(numberMax, result);
    }
}