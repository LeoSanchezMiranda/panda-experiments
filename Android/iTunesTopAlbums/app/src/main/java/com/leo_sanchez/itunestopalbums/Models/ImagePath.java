package com.leo_sanchez.itunestopalbums.Models;

import com.leo_sanchez.itunestopalbums.Models.Enums.ImageType;

/**
 * Created by ldjam on 3/28/2018.
 */

public class ImagePath {

    public ImagePath(String urlPath, ImageType imageType){
        this.type = imageType;
        this.urlPath = urlPath;
    }

    ImageType type;
    String urlPath;
}
