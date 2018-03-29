package com.leo_sanchez.itunestopalbums.Preparing;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.leo_sanchez.itunestopalbums.Logic.AlbumsService;
import com.leo_sanchez.itunestopalbums.Logic.IAlbumsService;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import java.util.List;

public class PreparingActivity extends AppCompatActivity {

    IAlbumsService albumsService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_preparing);

        albumsService = new AlbumsService();

        List<Album> albums = albumsService.getTopTenItunesAlbums();

        String test = "";
    }
}
