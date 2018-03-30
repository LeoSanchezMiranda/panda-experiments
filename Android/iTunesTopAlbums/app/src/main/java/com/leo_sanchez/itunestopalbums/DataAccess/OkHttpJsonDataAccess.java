package com.leo_sanchez.itunestopalbums.DataAccess;

import com.leo_sanchez.itunestopalbums.Activities.DownloadJsonActivity;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Response;

/**
 * Created by ldjam on 3/30/2018.
 */

public class OkHttpJsonDataAccess implements IJsonDataAccess{

    DownloadJsonActivity downloadActivity;

    public OkHttpJsonDataAccess(DownloadJsonActivity downloadActivity){
        this.downloadActivity = downloadActivity;
    }

    @Override
    public void getJsonFromUrl(String url){
        OkHttpClient client = new OkHttpClient();
        okhttp3.Request request = new okhttp3.Request.Builder().url(url).build();

        okhttp3.Callback callback = new okhttp3.Callback(){

            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String result = response.body().string();

                Runnable runThread = new Runnable() {
                    @Override
                    public void run() {
                        downloadActivity.handleJsonResponse(result);
                    }
                };

                downloadActivity.runOnUiThread(runThread);
            }
        };

        client.newCall(request).enqueue(callback);
    }

}
