package com.leo_sanchez.itunestopalbums.Models;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public class Album implements Parcelable {

    public String atist;
    public String name;
    public String id;
    public String thumbnailImagePath;
    public String mainImagePath;
    public int position;
    public String numberOfTracks;
    public String price;
    public String rights;
    public String category;
    public String itunesLink;
    public String releaseDate;

    public Album(){

    }

    public Album (String albumName, String albumArtist, String albumId){
        this.atist = albumArtist;
        this.name = albumName;
        this.id = albumId;
    }

    public Album(Parcel in){
        String[] data = new String[4];
        in.readStringArray(data);
        this.atist = data[0];
        this.name = data[1];
        this.thumbnailImagePath = data[2];
        this.mainImagePath = data[3];
    }

    public void setTumbnailImage(String urlPath){
        thumbnailImagePath = urlPath;
    }

    public void setMainImage(String urlPath){
        mainImagePath = urlPath;
    }

    public String getMainImage(){

        if(mainImagePath != null){
            return mainImagePath;
        }

        return "http://leo-sanchez.com/images/Leonardo%20Sanchez%20Miranda%20avatar.jpg";
    }

    public String getThumbnail(){

        if(thumbnailImagePath != null){
            return thumbnailImagePath;
        }

        return "http://leo-sanchez.com/images/Leonardo%20Sanchez%20Miranda%20avatar.jpg";
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {

        parcel.writeStringArray(new String[]{
                this.atist,
                this.name,
                this.thumbnailImagePath,
                this.mainImagePath
        });
    }

    public static final Creator<Album> CREATOR = new Creator<Album>() {
        @Override
        public Album createFromParcel(Parcel in) {
            return new Album(in);
        }

        @Override
        public Album[] newArray(int size) {
            return new Album[size];
        }
    };




}
