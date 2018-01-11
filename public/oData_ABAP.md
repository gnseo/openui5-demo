# Implementing oData Service by SEGW(transaction code) in SAP GUI

## Class ZCL_ZODOA_TEST_DPC_EXT

### Redefine Method `CSNSET_GET_ENTITY`
```abap
method CSNSET_GET_ENTITY.
  DATA: ls_key TYPE zoa_s_csn_key_test.
  LOOP AT it_key_tab INTO DATA(ls_input_key).
    CASE ls_input_key-name.
      WHEN 'Vkorg'.
        ls_key-vkorg = ls_input_key-value.
      WHEN 'Onum'.
        ls_key-onum = ls_input_key-value.
      WHEN OTHERS.
    ENDCASE.
  ENDLOOP.
  SELECT SINGLE * FROM zoa_t_csn_test
      INTO CORRESPONDING FIELDS OF ER_ENTITY
        WHERE vkorg = ls_key-vkorg
          AND onum = ls_key-onum
    .

endmethod.
```
### Redefine Method `CSNSET_GET_ENTITYSET`
```abap
METHOD csnset_get_entityset.
  DATA: lv_where TYPE string.

  lv_where = io_tech_request_context->get_osql_where_clause_convert( ).

  SELECT * FROM zoa_t_csn_test
      INTO CORRESPONDING FIELDS OF TABLE et_entityset
      WHERE (lv_where)
    .
ENDMETHOD.
```
### Redefine Method `CSNSET_UPDATE_ENTITY`
```abap
METHOD csnset_update_entity.
  DATA: ls_entry TYPE zcl_zodoa_test_mpc=>ts_csn.
  io_data_provider->read_entry_data( IMPORTING es_data = ls_entry ).

  DATA: ls_key TYPE zoa_s_csn_key_test.
  LOOP AT it_key_tab INTO DATA(ls_input_key).
    CASE ls_input_key-name.
      WHEN 'Vkorg'.
        ls_key-vkorg = ls_input_key-value.
      WHEN 'Onum'.
        ls_key-onum = ls_input_key-value.
      WHEN OTHERS.
    ENDCASE.
  ENDLOOP.

*    UPDATE zoa_t_csn_test SET zoabh = ls_entry-zoabh
*                        WHERE vkorg = ls_key-vkorg
*                          AND onum = ls_key-onum.
  DATA: ls_csn TYPE zoa_t_csn_test.

  MOVE-CORRESPONDING ls_entry TO ls_csn.

  UPDATE zoa_t_csn_test FROM ls_csn.
  IF sy-subrc = 0.
    /iwbep/if_mgw_conv_srv_runtime~set_header(
        EXPORTING
          is_header = VALUE #( name = 'succeed' value = 'true' )
    ).
  ELSE.
    /iwbep/if_mgw_conv_srv_runtime~set_header(
        EXPORTING
          is_header = VALUE #( name = 'succeed' value = 'false' )
    ).
  ENDIF.

  er_entity = ls_entry.
ENDMETHOD.
```
