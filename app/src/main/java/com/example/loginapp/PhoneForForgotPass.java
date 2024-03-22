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

public class PhoneForForgotPass extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_phone_for_forgot_pass);
        final LinearLayout LoginButton2 = findViewById(R.id.LoginButton2);
        LoginButton2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(PhoneForForgotPass.this,Login.class));
            }
        });

        final EditText InputMobile1 = findViewById(R.id.InputMobile1);
        final AppCompatButton buttonGetOTP1 = findViewById(R.id.buttonGetOTP1);
        final ProgressBar ProgressBar1 = findViewById(R.id.ProgressBar1);

        buttonGetOTP1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(InputMobile1.getText().toString().trim().isEmpty()){
                    Toast.makeText(PhoneForForgotPass.this,"Enter Phone Number",Toast.LENGTH_SHORT).show();
                    return;
                }
                ProgressBar1.setVisibility(View.VISIBLE);
                buttonGetOTP1.setVisibility(View.INVISIBLE);
                new CountDownTimer(2000, 1000) {
                    @Override
                    public void onTick(long millisUntilFinished) {
                    }
                    @Override
                    public void onFinish() {
                        startActivity(new Intent(PhoneForForgotPass.this,ForgotPassword.class));

                        ProgressBar1.setVisibility(View.GONE);
                        buttonGetOTP1.setVisibility(View.VISIBLE);
                    }
                }.start();
            }
        });
    }
}