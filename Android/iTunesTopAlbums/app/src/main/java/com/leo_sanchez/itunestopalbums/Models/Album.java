package com.leo_sanchez.itunestopalbums.Models;

import com.leo_sanchez.itunestopalbums.Models.Enums.ImageType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public class Album {

    public Album (String albumName, String albumArtist, String albumId){
        this.atist = albumArtist;
        this.name = albumName;
        this.id = albumId;
    }

    public String atist;
    public String name;
    public String id;
    public ImagePath thumbnailImage;
    public ImagePath mainImage;

    public void setTumbnailImage(String urlPath, ImageType type){
        thumbnailImage = new ImagePath(urlPath, type);
    }

    public void setMainImage(String urlPath, ImageType type){
        mainImage = new ImagePath(urlPath, type);
    }

    public String getMainImage(){
        return null;
    }

    public String getThumbnail(){
        return null;
    }
}
