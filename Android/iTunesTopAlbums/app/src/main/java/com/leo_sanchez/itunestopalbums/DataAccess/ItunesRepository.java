package com.leo_sanchez.itunestopalbums.DataAccess;

import android.os.AsyncTask;

import com.leo_sanchez.itunestopalbums.Logic.FeedEntryDtoMapping;
import com.leo_sanchez.itunestopalbums.Main.DownloadCompleteListener;

import org.json.JSONException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by ldjam on 3/29/2018.
 */

public class ItunesRepository extends AsyncTask<String, Void, String> {

    DownloadCompleteListener mDownloadCompleteListener;
    FeedEntryDtoMapping feedEntryDtoMapping;

    public ItunesRepository(DownloadCompleteListener downloadCompleteListener) {
        this.mDownloadCompleteListener = downloadCompleteListener;
        this.feedEntryDtoMapping = new FeedEntryDtoMapping();
    }

    @Override
    protected String doInBackground(String... params) {
        try {
            return downloadData(params[0]);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 2
    @Override
    protected void onPostExecute(String result) {
        mDownloadCompleteListener.downloadComplete(feedEntryDtoMapping.toAlbums(result));
    }

    private String downloadData(String urlString) throws IOException {
        InputStream is = null;

        try {
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();
            is = conn.getInputStream();
            return convertToString(is);
        } finally {
            if (is != null) {
                is.close();
            }
        }
    }

    private String convertToString(InputStream is) throws IOException {
        BufferedReader r = new BufferedReader(new InputStreamReader(is));
        StringBuilder total = new StringBuilder();
        String line;
        while ((line = r.readLine()) != null) {
            total.append(line);
        }
        return new String(total);
    }
}