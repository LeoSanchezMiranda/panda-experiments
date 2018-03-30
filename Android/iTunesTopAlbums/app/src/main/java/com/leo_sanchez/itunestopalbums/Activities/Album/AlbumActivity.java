package com.leo_sanchez.itunestopalbums.Activities.Album;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.leo_sanchez.itunestopalbums.Utilities.BitMapUtility;
import com.leo_sanchez.itunestopalbums.Activities.DownloadInformationActivity;
import com.leo_sanchez.itunestopalbums.Activities.Main.MainActivity;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import java.util.ArrayList;

public class AlbumActivity extends DownloadInformationActivity {

    String albumId;
    Album thisAlbum;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        albumId = getIntent().getStringExtra("ALBUM_ID");
        setContentView(R.layout.activity_album);
        startPreload();
    }

    @Override
    protected void handleAlbumsInformation(ArrayList<Album> albums) {
        thisAlbum = null;

        for(Album album : albums){
            if(album.id.equals(albumId)){
                thisAlbum = album;
            }
        }

        if(thisAlbum == null){
            alertAlbumNotFound();
        } else{
            populateAlbumInformation(thisAlbum);
        }
    }

    private void alertAlbumNotFound() {
        new AlertDialog.Builder(this)
                .setTitle("Album not Found")
                .setMessage("It looks like the album you're looking for is not available. " +
                        "Please try again")
                .setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = new Intent(getBaseContext(), MainActivity.class);
                        startActivity(intent);
                    }
                }).setIcon(android.R.drawable.ic_dialog_alert).show();
    }

    private void populateAlbumInformation(Album album) {
        ImageView albumImage = (ImageView) findViewById(R.id.albumImage);
        TextView albumName = (TextView) findViewById(R.id.albumName);
        TextView albumArtist = (TextView) findViewById(R.id.albumArtist);
        TextView trackCount = (TextView) findViewById(R.id.trackCount);
        TextView releaseDate = (TextView) findViewById(R.id.releaseDate);
        TextView category = (TextView) findViewById(R.id.category);
        TextView rights = (TextView) findViewById(R.id.rights);
        Button buyButton = (Button) findViewById(R.id.buyButton);
        RelativeLayout mainLayout = (RelativeLayout) findViewById(R.id.mainLayout);

        albumImage.setImageBitmap(BitMapUtility.loadBitmap(album.getMainImage()));
        albumName.setText(album.name);
        albumArtist.setText("by " + album.atist);
        trackCount.setText("Contains " + album.numberOfTracks + " tracks.");
        releaseDate.setText("Released on " + album.releaseDate);
        category.setText("Category: " + album.category);
        rights.setText(album.rights);
        buyButton.setText("view on iTunes - " + album.price);

        mainLayout.setVisibility(View.VISIBLE);
    }

    public void navigateToItunes(View view) {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(thisAlbum.itunesLink));
        startActivity(browserIntent);
    }

    public void goBack(View view) {
        Intent intent = new Intent(getBaseContext(), MainActivity.class);
        startActivity(intent);
    }
}
