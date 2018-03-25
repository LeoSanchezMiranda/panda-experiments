package com.leo_sanchez.columbiatennisladder.Models;

/**
 * Created by ldjam on 3/24/2018.
 */

public class Player {

    public Player(String firstName, String lastName, int position){
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
    }

    public String firstName;
    public String lastName;
    public int position;

    public String getFullName(){
        return lastName + ", " + firstName;
    }
}
