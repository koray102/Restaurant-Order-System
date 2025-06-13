package com.restaurant.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;
    private String tableNumber;
    private String note;
    private String cardInfo;
    private Long timestamp;

    private String status = "siparis alindi";

    // JSON olarak gelen cart içindeki yemekleri string olarak saklayacağız (şimdilik)
    @Lob
    @Column(columnDefinition = "TEXT")
    private String cartJson;

    public Order() {}

    // Getter - Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getTableNumber() { return tableNumber; }
    public void setTableNumber(String tableNumber) { this.tableNumber = tableNumber; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public String getCardInfo() { return cardInfo; }
    public void setCardInfo(String cardInfo) { this.cardInfo = cardInfo; }

    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }

    public String getCartJson() { return cartJson; }
    public void setCartJson(String cartJson) { this.cartJson = cartJson; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}