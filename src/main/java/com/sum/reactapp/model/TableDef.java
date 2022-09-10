package com.sum.reactapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashMap;

@Data
@ToString
@AllArgsConstructor
@Builder
public class TableDef extends HashMap<String, ArrayList<ColumnDef>> {
}
