package com.leo_sanchez.itunestopalbums.Logic;

import com.google.gson.Gson;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.FeedElement;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.FeedEntry;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.ItunesFeedDTO;
import com.leo_sanchez.itunestopalbums.Models.Album;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public class FeedEntryDtoMapping {

    Gson gson;

    public FeedEntryDtoMapping(){
        gson = new Gson();
    }

    public ArrayList<Album> toAlbums(String response){
        ItunesFeedDTO feedResponse = gson.fromJson(response, ItunesFeedDTO.class);

        ArrayList<Album> albums = new ArrayList<Album>();

        for(FeedEntry albumEntry : feedResponse.feed.entry){
            Album album = toAlbum(albumEntry);
            albums.add(album);
        }

        return albums;
    }

    public Album toAlbum(FeedEntry albumSource){
        Album album = new Album(albumSource.name.description, albumSource.artist.description, albumSource.id.attributes.id);
        album.position = Integer.parseInt(albumSource.itemCount.description);
        album.numberOfTracks = albumSource.itemCount.description;
        album.price = albumSource.price.description;
        album.rights = albumSource.rights.description;
        album.category = albumSource.category.attributes.label;
        album.itunesLink = albumSource.link.attributes.href;
        album.releaseDate = albumSource.releaseDate.attributes.label;


        for (FeedElement image : albumSource.images){
            if(Integer.parseInt(image.attributes.height) < 100){
                album.setTumbnailImage(image.description);
            } else {
                album.setMainImage(image.description);
            }
        }

        return album;
    }
}
