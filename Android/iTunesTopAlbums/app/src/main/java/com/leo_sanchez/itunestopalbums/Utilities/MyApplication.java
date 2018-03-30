package com.leo_sanchez.itunestopalbums.Utilities;

import android.app.Application;
import android.content.Context;

/**
 * Created by ldjam on 3/30/2018.
 */

public class MyApplication extends Application {
    private static Context context;

    public void onCreate() {
        super.onCreate();
        MyApplication.context = getApplicationContext();
    }

    public static Context getAppContext() {
        return MyApplication.context;
    }
}
