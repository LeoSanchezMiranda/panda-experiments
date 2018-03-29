package com.leo_sanchez.itunestopalbums.Main;

import com.leo_sanchez.itunestopalbums.Models.Album;

import java.util.ArrayList;

/**
 * Created by ldjam on 3/29/2018.
 */

public interface DownloadCompleteListener {
    void downloadComplete(ArrayList<Album> albums);
}
