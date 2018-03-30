package com.leo_sanchez.itunestopalbums.Activities.Main;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.leo_sanchez.itunestopalbums.Activities.Album.AlbumActivity;
import com.leo_sanchez.itunestopalbums.Activities.DownloadJsonActivity;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import java.util.ArrayList;

public class MainActivity extends DownloadJsonActivity {

    ListFragment mListFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        startPreload();
    }

    @Override
    protected void handleAlbumsInformation(ArrayList<Album> albums) {
        mListFragment = ListFragment.newInstance(albums);
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.fragment_container, mListFragment)
                .commit();
    }

    public void handleAlbumClick(View view) {
        TextView albumId = (TextView) view.findViewById(R.id.albumId);
        Intent intent = new Intent(getBaseContext(), AlbumActivity.class);
        intent.putExtra("ALBUM_ID", albumId.getText());
        startActivity(intent);
    }
}