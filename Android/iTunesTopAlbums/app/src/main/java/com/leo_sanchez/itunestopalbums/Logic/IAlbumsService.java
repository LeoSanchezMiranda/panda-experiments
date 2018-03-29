package com.leo_sanchez.itunestopalbums.Logic;

import com.leo_sanchez.itunestopalbums.Models.Album;

import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public interface IAlbumsService {
    List<Album> getTopTenItunesAlbums();
}
