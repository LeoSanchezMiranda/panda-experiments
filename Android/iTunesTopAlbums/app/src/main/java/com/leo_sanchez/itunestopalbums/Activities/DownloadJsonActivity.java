package com.leo_sanchez.itunestopalbums.Activities;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;

import com.leo_sanchez.itunestopalbums.DataAccess.APIContracts.IItunesAPIContract;
import com.leo_sanchez.itunestopalbums.DataAccess.CacheObject;
import com.leo_sanchez.itunestopalbums.DataAccess.IJsonDataAccess;
import com.leo_sanchez.itunestopalbums.DataAccess.InternalStorage;
import com.leo_sanchez.itunestopalbums.DataAccess.OkHttpJsonDataAccess;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.Utilities.FeedEntryDtoMapping;

import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class DownloadJsonActivity extends AppCompatActivity{

    ProgressDialog mProgressDialog;
    IJsonDataAccess jsonDataAccess;
    boolean needToSaveAlbumsInLocalStorage;
    String cacheKey = "ALBUMS_INTERNAL";

    public DownloadJsonActivity(){
        jsonDataAccess = new OkHttpJsonDataAccess(this);
        needToSaveAlbumsInLocalStorage = false;
    }

    protected void handleAlbumsInformation(ArrayList<Album> albums) {
    }

    public void handleJsonResponse(String json){
        ArrayList<Album> albums = new ArrayList<Album>();

        try {
            albums = new FeedEntryDtoMapping().toAlbums(json);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if(needToSaveAlbumsInLocalStorage){
            try {
                InternalStorage.writeObject(DownloadJsonActivity.this, cacheKey, json, 1);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        handleAlbumsInformation(albums);

        if (mProgressDialog != null) {
            mProgressDialog.hide();
        }
    }

    public void startDownload(){
        CacheObject albumsOnFile = null;

        try{
            albumsOnFile = InternalStorage.readObject(DownloadJsonActivity.this, cacheKey);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        if(albumsOnFile != null && albumsOnFile.isActive()){
            handleJsonResponse((String) albumsOnFile.getValue());
        } else {
            needToSaveAlbumsInLocalStorage = true;
            jsonDataAccess.getJsonFromUrl(IItunesAPIContract.topTenAlbumsEndpoint);
        }


    }

    public void startPreload() {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

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

    public boolean isNetworkConnected() {
        ConnectivityManager connMgr = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }
}
