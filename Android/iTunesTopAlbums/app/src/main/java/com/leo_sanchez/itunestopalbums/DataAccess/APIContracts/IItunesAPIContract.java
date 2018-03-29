package com.leo_sanchez.itunestopalbums.DataAccess.APIContracts;

/**
 * Created by ldjam on 3/28/2018.
 */

public interface IItunesAPIContract {
    String topTenAlbumsEndpoint = "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topalbums/limit=10/json";
}
