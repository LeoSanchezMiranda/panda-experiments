package com.leo_sanchez.itunestopalbums.Activities;

import android.support.v7.app.AppCompatActivity;

import com.leo_sanchez.itunestopalbums.Models.Album;

import java.util.ArrayList;

/**
 * Created by ldjam on 3/29/2018.
 */

public interface DownloadCompleteListener {
    void downloadComplete(ArrayList<Album> albums);
    void startDownload();
}


