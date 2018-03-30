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
import com.leo_sanchez.itunestopalbums.DataAccess.ItunesRepository;
import com.leo_sanchez.itunestopalbums.Models.Album;

import java.util.ArrayList;

public class DownloadInformationActivity extends AppCompatActivity implements DownloadCompleteListener{

    ProgressDialog mProgressDialog;

    @Override
    public void downloadComplete(ArrayList<Album> albums) {
        handleAlbumsInformation(albums);
        if (mProgressDialog != null) {
            mProgressDialog.hide();
        }
    }

    protected void handleAlbumsInformation(ArrayList<Album> albums) {
    }

    @Override
    public void startDownload(){
        new ItunesRepository(this).execute(IItunesAPIContract.topTenAlbumsEndpoint);
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
