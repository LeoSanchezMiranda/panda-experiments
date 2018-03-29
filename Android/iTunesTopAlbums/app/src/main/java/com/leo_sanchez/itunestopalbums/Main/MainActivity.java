package com.leo_sanchez.itunestopalbums.Main;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.leo_sanchez.itunestopalbums.AlbumActivity;
import com.leo_sanchez.itunestopalbums.DataAccess.APIContracts.IItunesAPIContract;
import com.leo_sanchez.itunestopalbums.DataAccess.ItunesRepository;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements DownloadCompleteListener{

    ListFragment mListFragment;
    ProgressDialog mProgressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        setContentView(R.layout.activity_main);

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



        showListFragment(albums);
        if (mProgressDialog != null) {
            mProgressDialog.hide();
        }
    }



    private void startDownload(){
        new ItunesRepository(this).execute(IItunesAPIContract.topTenAlbumsEndpoint);
    }

    private void showListFragment(ArrayList<Album> albums) {
        mListFragment = ListFragment.newInstance(albums);
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.fragment_container, mListFragment)
                .commit();

    }

    private boolean isNetworkConnected() {
        ConnectivityManager connMgr = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }

    public void handleAlbumClick(View view) {
        TextView albumId = (TextView) view.findViewById(R.id.albumId);
        Intent intent = new Intent(getBaseContext(), AlbumActivity.class);
        intent.putExtra("ALBUM_ID", albumId.getText());
        startActivity(intent);
    }
}
