#include <iostream>
#include <vector>

using namespace std;

class PaymentMethod {
public:
    virtual void processPayment(double amount) = 0; 
    virtual ~PaymentMethod() {  
        cout << "PaymentMethod destructor called\n";
    }
};

class CreditCard : public PaymentMethod {
private:
    string cardNumber;
    string expirationDate;
    string cardHolderName;

public:
    CreditCard(const string& cardNumber, const string& expirationDate, const string& cardHolderName)
        : cardNumber(cardNumber), expirationDate(expirationDate), cardHolderName(cardHolderName) {}

    void processPayment(double amount) override {
        cout << "Processing payment with credit card: " << cardHolderName
            << ", amount: $" << amount << endl;
    }

    ~CreditCard() {
        cout << "CreditCard destructor called\n";
    }
};

class PayPal : public PaymentMethod {
private:
    string email;

public:
    PayPal(const string& email) : email(email) {}

    void processPayment(double amount) override {
        cout << "Processing payment via PayPal account: " << email
            << ", amount: $" << amount << endl;
    }

    ~PayPal() {
        cout << "PayPal destructor called\n";
    }
};

class BankTransfer : public PaymentMethod {
private:
    string bankAccountNumber;
    string bankName;

public:
    BankTransfer(const string& bankAccountNumber, const string& bankName)
        : bankAccountNumber(bankAccountNumber), bankName(bankName) {}

    void processPayment(double amount) override {
        cout << "Processing payment via bank transfer: " << bankName
            << ", account: " << bankAccountNumber << ", amount: $" << amount << endl;
    }

    ~BankTransfer() {
        cout << "BankTransfer destructor called\n";
    }
};

int main() {
    vector<PaymentMethod*> paymentMethods;

    paymentMethods.push_back(new CreditCard("1234 5678 9012 3456", "12/24", "Vlad Kydun"));
    paymentMethods.push_back(new PayPal("vlad.kydun@example.com"));
    paymentMethods.push_back(new BankTransfer("US12345678901234567890", "Bank of America"));

    for (PaymentMethod* method : paymentMethods) {
        method->processPayment(100.50); 
    }

    for (PaymentMethod* method : paymentMethods) {
        delete method;
    }
}
