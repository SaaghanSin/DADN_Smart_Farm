package com.example.loginapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.concurrent.TimeUnit;

public class PhoneOTP extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_phone_otp);

        final LinearLayout LoginButton1 = findViewById(R.id.LoginButton1);
        LoginButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(PhoneOTP.this,Login.class));
            }
        });

        final EditText InputMobile = findViewById(R.id.InputMobile);
        final AppCompatButton buttonGetOTP = findViewById(R.id.buttonGetOTP);
        final ProgressBar ProgressBar = findViewById(R.id.ProgressBar);

        buttonGetOTP.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(InputMobile.getText().toString().trim().isEmpty()){
                    Toast.makeText(PhoneOTP.this,"Enter Phone Number",Toast.LENGTH_SHORT).show();
                    return;
                }
                ProgressBar.setVisibility(View.VISIBLE);
                buttonGetOTP.setVisibility(View.INVISIBLE);
                new CountDownTimer(2000, 1000) {
                    @Override
                    public void onTick(long millisUntilFinished) {
                    }
                    @Override
                    public void onFinish() {
                        Intent intent = new Intent(getApplicationContext(),SendOTP.class);
                        intent.putExtra("mobile",InputMobile.getText().toString());
                        startActivity(intent);

                        ProgressBar.setVisibility(View.GONE);
                        buttonGetOTP.setVisibility(View.VISIBLE);
                    }
                }.start();
            }
        });
    }
}