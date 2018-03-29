package com.leo_sanchez.itunestopalbums.DataAccess;

import android.os.AsyncTask;
import android.util.Log;

import com.google.gson.Gson;
import com.leo_sanchez.itunestopalbums.DataAccess.APIContracts.IItunesAPIContract;
import com.leo_sanchez.itunestopalbums.DataAccess.DTO.ItunesFeedDTO;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;

/**
 * Created by ldjam on 3/28/2018.
 */

public class AlbumsDataAccess implements IAlbumsDataAccess {

    String txtJson;

    AlbumsJsonDataAccess jsonDataAccess;

    String path;

    Gson gson;

    public AlbumsDataAccess(){
        jsonDataAccess = new AlbumsJsonDataAccess();
        path = IItunesAPIContract.topTenAlbumsEndpoint;
        gson = new Gson();
    }

    @Override
    public ItunesFeedDTO getTopTenItunesAlbumsFeed() {
        try {
            jsonDataAccess.execute().get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        ItunesFeedDTO result = gson.fromJson(txtJson, ItunesFeedDTO.class);
        return result;
    }

    protected class AlbumsJsonDataAccess extends AsyncTask<Void, Void, String> {

        @Override
        protected String doInBackground(Void... params) {

            HttpURLConnection connection = null;
            BufferedReader reader = null;

            try{
                URL url = new URL(path);
                connection = (HttpURLConnection) url.openConnection();
                connection.connect();

                InputStream stream = connection.getInputStream();

                reader = new BufferedReader(new InputStreamReader(stream));

                StringBuffer buffer = new StringBuffer();
                String line = "";

                while ((line = reader.readLine()) != null){
                    buffer.append(line+"\n");
                    Log.d("Response: ", "> " + line);
                }

                String jsonResult = buffer.toString();

                return jsonResult;

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);

            txtJson = result;
        }
    }
}


