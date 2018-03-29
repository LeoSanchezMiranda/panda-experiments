package com.leo_sanchez.itunestopalbums.Logic;

import com.leo_sanchez.itunestopalbums.DataAccess.AlbumsDataAccess;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.FeedElement;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.FeedEntry;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.ItunesFeedDTO;
import com.leo_sanchez.itunestopalbums.DataAccess.IAlbumsDataAccess;
import com.leo_sanchez.itunestopalbums.Models.Album;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public class AlbumsService implements IAlbumsService {

    IAlbumsDataAccess albumsDataAccess;

    FeedEntryDtoMapping entryDtoMapping;

    public AlbumsService(){
        albumsDataAccess = new AlbumsDataAccess();
        entryDtoMapping = new FeedEntryDtoMapping();
    }

    @Override
    public List<Album> getTopTenItunesAlbums() {

        ItunesFeedDTO topTenItunesAlbumFeed = albumsDataAccess.getTopTenItunesAlbumsFeed();
        
        if(topTenItunesAlbumFeed == null){
            return null;
        }
        
        List<Album> albums = new ArrayList<Album>();
        
        for(FeedEntry albumEntry : topTenItunesAlbumFeed.feed.entry){
            Album album = entryDtoMapping.toAlbum(albumEntry);
            albums.add(album);
        }

        return albums;
    }
}
