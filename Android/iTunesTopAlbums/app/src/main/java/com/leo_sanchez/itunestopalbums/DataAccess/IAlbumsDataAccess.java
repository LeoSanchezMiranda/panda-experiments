package com.leo_sanchez.itunestopalbums.DataAccess;

import com.leo_sanchez.itunestopalbums.DataAccess.DTO.ItunesFeedDTO;

/**
 * Created by ldjam on 3/28/2018.
 */

public interface IAlbumsDataAccess {
    ItunesFeedDTO getTopTenItunesAlbumsFeed();
}
