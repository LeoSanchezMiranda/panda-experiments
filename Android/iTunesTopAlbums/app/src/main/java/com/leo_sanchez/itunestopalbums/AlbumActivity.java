package com.leo_sanchez.itunestopalbums;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.leo_sanchez.itunestopalbums.DataAccess.APIContracts.IItunesAPIContract;
import com.leo_sanchez.itunestopalbums.DataAccess.ItunesRepository;
import com.leo_sanchez.itunestopalbums.Logic.BitMapUtility;
import com.leo_sanchez.itunestopalbums.Main.DownloadCompleteListener;
import com.leo_sanchez.itunestopalbums.Main.MainActivity;
import com.leo_sanchez.itunestopalbums.Models.Album;

import org.w3c.dom.Text;

import java.util.ArrayList;

public class AlbumActivity extends AppCompatActivity implements DownloadCompleteListener {

    ProgressDialog mProgressDialog;
    String albumId;
    Album thisAlbum;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        setContentView(R.layout.activity_album);

        albumId = getIntent().getStringExtra("ALBUM_ID");

        if (isNetworkConnected()) {
            mProgressDialog = new ProgressDialog(this);
            mProgressDialog.setMessage("Please wait...");
            mProgressDialog.setCancelable(false);
            mProgressDialog.show();

            startDownload();
        } else {
            new AlertDialog.Builder(this)
                    .setTitle("No Internet Connection")
                    .setMessage("It looks like your internet connection is off. Please turn it " +
                            "on and try again")
                    .setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                        }
                    }).setIcon(android.R.drawable.ic_dialog_alert).show();
        }
    }

    @Override
    public void downloadComplete(ArrayList<Album> albums) {
        showAlbum(albums);
        if (mProgressDialog != null) {
            mProgressDialog.hide();
        }
    }

    private void showAlbum(ArrayList<Album> albums) {
        thisAlbum = null;

        for(Album album : albums){
            if(album.id.equals(albumId)){
                thisAlbum = album;
            }
        }

        if(thisAlbum == null){
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
        } else{
            displayAlbumInformation(thisAlbum);
        }
    }

    private void displayAlbumInformation(Album album) {
        ((ImageView) findViewById(R.id.albumImage)).setImageBitmap(BitMapUtility.loadBitmap(album.getMainImage()));
        ((TextView) findViewById(R.id.albumName)).setText(album.name);
        ((TextView) findViewById(R.id.albumArtist)).setText("by " + album.atist);
        ((TextView) findViewById(R.id.trackCount)).setText("Contains " + album.numberOfTracks + " tracks.");
        ((TextView) findViewById(R.id.releaseDate)).setText("Released on " + album.releaseDate);
        ((TextView) findViewById(R.id.category)).setText("Category: " + album.category);
        ((TextView) findViewById(R.id.rights)).setText(album.rights);
        ((Button) findViewById(R.id.buyButton)).setText("view on iTunes - " + album.price);
    }

    private void startDownload(){
        new ItunesRepository(this).execute(IItunesAPIContract.topTenAlbumsEndpoint);
    }

    private boolean isNetworkConnected() {
        ConnectivityManager connMgr = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
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
