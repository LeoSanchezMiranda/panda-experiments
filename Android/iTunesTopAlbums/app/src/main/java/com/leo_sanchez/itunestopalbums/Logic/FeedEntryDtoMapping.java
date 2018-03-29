package com.leo_sanchez.itunestopalbums.Logic;

import com.leo_sanchez.itunestopalbums.DataAccess.DTO.FeedElement;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.FeedEntry;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.Models.Enums.ImageType;

/**
 * Created by ldjam on 3/28/2018.
 */

public class FeedEntryDtoMapping {
    public Album toAlbum(FeedEntry albumSource){
        Album album = new Album(albumSource.name.description, albumSource.artist.description, albumSource.artist.description);

        for (FeedElement image : albumSource.images){
            if(Integer.parseInt(image.attributes.height) < 100){
                album.setTumbnailImage(image.description, ImageType.Thumbnail);
            } else {
                album.setMainImage(image.description, ImageType.Full);
            }
        }

        return album;
    }
}
