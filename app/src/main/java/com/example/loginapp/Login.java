package com.example.loginapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.text.InputType;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import android.os.Handler;

public class Login extends AppCompatActivity {

    private boolean passwordShowing = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);
        final EditText PhoneNumberET = findViewById(R.id.PhoneNumberET);
        final EditText PasswordET = findViewById(R.id.PasswordET);
        final ImageView ShowpasswordButton = findViewById(R.id.ShowpasswordButton);
        ShowpasswordButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(passwordShowing){
                    passwordShowing = false;

                    PasswordET.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
                    ShowpasswordButton.setImageResource(R.drawable.show_pass);
                }
                else{
                    passwordShowing = true;

                    PasswordET.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
                    ShowpasswordButton.setImageResource(R.drawable.hide_pass);
                }
                PasswordET.setSelection(PasswordET.length());
            }
        });

        final TextView ForgotPasswordButton = findViewById(R.id.ForgotPasswordButton);
        ForgotPasswordButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(Login.this,PhoneForForgotPass.class));
            }
        });

        final RelativeLayout SigninwithPhoneOTPButton = findViewById(R.id.SigninwithPhoneOTPButton);
        SigninwithPhoneOTPButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(Login.this,PhoneOTP.class));
            }
        });

        final RelativeLayout SignInwithGoogleButton = findViewById(R.id.SignInwithGoogleButton);
        SignInwithGoogleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(Login.this,GoogleGmail.class));
            }
        });

        final AppCompatButton SignInButton = findViewById(R.id.SignInButton);
        final ProgressBar ProgressBar2 = findViewById(R.id.ProgressBar2);
        SignInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (PhoneNumberET.getText().toString().trim().isEmpty()){
                    Toast.makeText(Login.this,"Enter phone number",Toast.LENGTH_SHORT).show();
                }
                else if (PasswordET.getText().toString().trim().isEmpty()){
                    Toast.makeText(Login.this,"Enter password",Toast.LENGTH_SHORT).show();
                }
                else {
                    ProgressBar2.setVisibility(View.VISIBLE);
                    SignInButton.setVisibility(View.INVISIBLE);
                    new CountDownTimer(1000, 1000) {
                        @Override
                        public void onTick(long millisUntilFinished) {
                        }
                        @Override
                        public void onFinish() {
                            startActivity(new Intent(Login.this,RicardoMelos.class));

                            ProgressBar2.setVisibility(View.GONE);
                            ProgressBar2.setVisibility(View.VISIBLE);

                            new Handler().postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    Toast.makeText(Login.this,"Success",Toast.LENGTH_SHORT).show();
                                }
                            }, 250);
                        }
                    }.start();
                }
            }
        });
    }
}