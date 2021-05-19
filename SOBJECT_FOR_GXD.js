import { OBJLoader } from "./node_modules/three/examples/jsm/loaders/OBJLoader.js";
import { DDSLoader } from './node_modules/three/examples/jsm/loaders/DDSLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import {
    WebGLRenderer,
    Scene,
    Mesh,
	FileLoader,
    MeshBasicMaterial,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    Vector3,
    Vector4,
    Matrix3,
    Matrix4
} from "./node_modules/three/build/three.module.js";
import "./zlib.js"

var GXDScene = NULL;
var GXDCamera = NULL;
var GXDControl = NULL;
var GXDRenderer = NULL;
var GXDDefaultLight = function(){
    const light = new DirectionalLight( 0xFFFFFF, 1 );
    light.position.set( -1, 2, 4 );
    return light;
}

var CreateScene = function(){ GXDScene = new Scene(); return GXDScene; }
var GetScene = function(){ return GXDScene; }
var CreateLight = function(){
    if( GXDScene )
    {
        GXDScene.add( GXDDefaultLight() );
    }
}
var CreateCamera = function( fov = 18, aspect = 2, near = 0.1, far = 1000
    , position = new Vector3( 0, 0, 0 )
    , rotation = new Vector4( 0, 0, 0, 1 ) 
){
    GXDCamera = new PerspectiveCamera( fov, aspect, near, far );
    GXDCamera.position.x = position.x;
    GXDCamera.position.y = position.y;
    GXDCamera.position.z = position.z;
    GXDCamera.rotation.x = rotation.x;
    GXDCamera.rotation.y = rotation.y;
    GXDCamera.rotation.z = rotation.z;
    GXDCamera.rotation.w = rotation.w;

    GXDControl = new OrbitControls( GXDCamera, GXDRenderer.domElement );
    GXDControl.update();
    
    return GXDCamera;
}
var GetCamera = function(){ return GXDCamera; }
var SetCamera = function( camera ){ GXDCamera = camera; return GXDCamera; }

var CreateRenderer = function(){
    var div = document.getElementById( "renderer" );
    if( div === NULL ){
        div = document.createElement( 'div' );
        div.id = "renderer";
        document.body.appendChild( div );
        div = document.getElementById( "renderer" );
    }
    GXDRenderer = new WebGLRenderer();
    GXDRenderer.setPixelRatio( window.devicePixelRatio );
    GXDRenderer.setSize( window.innerWidth, window.innerHeight );
    div.appendChild( GXDRenderer.domElement );
    window.addEventListener( 'resize', onWindowResize );
    return GXDRenderer;
}
var GetRenderer = function(){ return GXDRenderer; }

var CreateGrid = function(){
    const helper = new GridHelper( 10000, 400, 0x303030, 0x303030 );
    helper.position.y = -5;
    GXDScene.add( helper );
}

function onWindowResize() {
    GXDCamera.aspect = window.innerWidth / window.innerHeight;
    GXDCamera.updateProjectionMatrix();
    GXDRenderer.setSize( window.innerWidth, window.innerHeight );
}
var Update = function(){
    requestAnimationFrame( Update );
    GXDRenderer.render( GXDScene, GXDCamera );
    GXDControl.update();
}

Uint8Array.prototype.ToByte = function( offset ) {
    if( offset+size > this.byteLength ) return 0;
    var int8 = new Uint8Array( this.slice( offset, offset+size ) );
    return int8;
}
Uint8Array.prototype.ToBYTE = function( offset, size = 1 ) {
    if( offset+size > this.byteLength ) return 0;
    var int8 = new Uint8Array( this.slice( offset, offset+size ) );
    return int8;
}
Uint8Array.prototype.ToInt16 = function( offset = 0 ) {
    if( offset+2 > this.byteLength ) return 0;
    var int16 = new Uint8Array( this.slice( offset, offset+2 ) );
    const buffer = new ArrayBuffer( 2 );
    const view = new DataView( buffer );
    view.setInt8( 0, int16[1] );
    view.setInt8( 1, int16[0] );
    return view.getInt16();
}
Uint8Array.prototype.ToUInt16 = function( offset = 0 ) {
    if( offset+2 > this.byteLength ) return 0;
    var uint16 = new Uint8Array( this.slice( offset, offset+2 ) );
    const buffer = new ArrayBuffer( 2 );
    const view = new DataView( buffer );
    view.setUint8( 0, uint16[1] );
    view.setUint8( 1, uint16[0] );
    return view.getUint16();
}
Uint8Array.prototype.ToInt32 = function( offset = 0 ) {
    if( offset+4 > this.byteLength ) return 0;
    var int32 = new Uint8Array( this.slice( offset, offset+4 ) );
    const buffer = new ArrayBuffer( 4 );
    const view = new DataView( buffer );
    view.setInt8( 0, int32[3] );
    view.setInt8( 1, int32[2] );
    view.setInt8( 2, int32[1] );
    view.setInt8( 3, int32[0] );
    return view.getInt32();
}
Uint8Array.prototype.ToUInt32 = function( offset = 0 ) {
    if( offset+4 > this.byteLength ) return 0;
    var uint32 = new Uint8Array( this.slice( offset, offset+4 ) );
    const buffer = new ArrayBuffer( 4 );
    const view = new DataView( buffer );
    view.setUint8( 0, uint32[3] );
    view.setUint8( 1, uint32[2] );
    view.setUint8( 2, uint32[1] );
    view.setUint8( 3, uint32[0] );
    return view.getUint32();
}
Uint8Array.prototype.ToFloat = function( offset = 0 ) {
    if( offset+4 > this.byteLength ) return 0;
    var int8 = new Uint8Array( this.slice( offset, offset+4 ) );
    const buffer = new ArrayBuffer( 4 );
    const view = new DataView( buffer );
    view.setInt8( 0, int8[3] );
    view.setInt8( 1, int8[2] );
    view.setInt8( 2, int8[1] );
    view.setInt8( 3, int8[0] );
    return view.getFloat32();
}
Uint8Array.prototype.ToDouble = function( offset = 0 ) {
    if( offset+4 > this.byteLength ) return 0;
    var uint8 = new Uint8Array( this.slice( offset, offset+4 ) );
    const buffer = new ArrayBuffer( 4 );
    const view = new DataView( buffer );
    view.setUint32( 0, this.ToUInt32() );
    return view.getFloat64();
}
Uint8Array.prototype.ToArrayBuffer = function( offset = 0, size = 1 ) {
    if( offset+size > this.byteLength ) return new ArrayBuffer();
    var uint8 = new Uint8Array( this.slice( offset, size ) );
    const buffer = new ArrayBuffer( size );
    const view = new DataView( buffer );
    for( let i = 0; i < uint8.length; i++ )
    {
        view.setUint8( i, uint8[i] );
    }
    return view.buffer;
}

var NULL = null;
var TRUE = true;
var FALSE = false;

/*
typedef struct
{
	float mV[3];
	float mN[3];
	float mT[2];
}
SKINVERTEX_FOR_GXD;
typedef struct
{
	int mBoneIndex[4];
	float mBlendValue[4];
}
SKINWEIGHT_FOR_GXD;
typedef struct
{
	BOOL mCheckTwoSide;
	BOOL mCheckRadiation;
	float mRadiationSpeed;
	float mRadiationLowLimit[4];
	float mRadiationHighLimit[4];
	BOOL mCheckLightBright;
	BOOL mCheckCameraSpecularEffect;
	int mCameraSpecularEffectSort;
	float mCameraSpecularEffectMaterialValue[4];
	float mCameraSpecularEffectMaterialPower;
	float mCameraSpecularEffectLightAddValue;
	BOOL mCheckTextureAnimation;
	float mTextureAnimationSpeed;
	BOOL mCheckUVScroll1;
	int mUVScrollSort1;
	float mUVScrollSpeed1;
	BOOL mCheckBillboard;
	int mBillboardSort;
	BOOL mCheckUVScroll2;
	int mUVScrollSort2;
	float mUVScrollSpeed2;
}
SKINEFFECT_FOR_GXD;
typedef struct
{
	float mBoxMin[3];
	float mBoxMax[3];
	float mCenter[3];
	float mRadius;
}
SKINSIZE_FOR_GXD;
typedef struct
{
	float mV[3];
	float mN[3];
	float mT[2];
	float mBoneIndex[4];
	float mBlendValue[4];
}
SKINLODVERTEX_FOR_GXD;
*/

var HANDLE = function( data ){
    return {
        Data: data,
        ReadOffset: 0,
        AddSize: function( size ){
            this.ReadOffset += size;
        },
        Read: function( nReadSize ){//return Uint8Array
            var data = new Uint8Array( this.Data.slice( this.ReadOffset, this.ReadOffset + nReadSize ) );
            this.AddSize( nReadSize );
            return data;
        },
        ReadArrayBuffer: function( nReadSize ){//return ArrayBuffer
            var data = this.Data.slice( this.ReadOffset, this.ReadOffset + nReadSize );
            this.AddSize( nReadSize );
            return data;
        }
    }
}
var ReadFile = function( hFile, lpData, nReadByte ) {
    if( hFile.Data.byteLength < nReadByte )
        return FALSE;
    if( lpData.Type == "BYTE" )
    {
        lpData.Data = hFile.Read( nReadByte ).ToByte();
    }
    else if( lpData.Type == "BYTE*" )
    {
        lpData.Data = hFile.Read( nReadByte );
    }
    else if( lpData.Type == "WORD" )
    {
        lpData.Data = hFile.Read( nReadByte ).ToUInt16();
    }
    else if( lpData.Type == "int" )
    {
        lpData.Data = hFile.Read( nReadByte ).ToInt32();
    }
    else if( lpData.Type == "float" )
    {
        lpData.Data = hFile.Read( nReadByte ).ToFloat();
    }
    else return FALSE;
    return TRUE;
}
var CreateDataType = function( value, type ){
    return { Data : value, Type : type };
}
var CreateBYTE = function( value = 0 ){
    return CreateDataType( value, "BYTE" );
}
var CreateBYTEArray = function(){
    return CreateDataType( new Uint8Array(), "BYTE*" );
}
var CreateInt = function( value = 0 ){
    return CreateDataType( value, "int" );
}
var CreateFloat = function( value = 0.0 ){
    return CreateDataType( value, "float" );
}
var CreateFloatArray = function( numOfArray ){
    var arr = Array( numOfArray );
    for( var i = 0; i < numOfArray; i++ )
    {
        arr[i] = CreateFloat();
    }
    return arr;
}
var ToArray = function( type, value ){
    var result = [];
    if( typeof value === 'object' && value.constructor === Uint8Array )
    {
        var offset = 0;
        while( TRUE )
        {
            if( type === 'int' )
            {
                result.push( value.ToInt32( offset ) );
                offset += 4;
            }
            else if( type === 'float' )
            {
                result.push( value.ToFloat( offset ) );
                offset += 4;
            }
            else if( type === 'WORD' )
            {
                result.push( value.ToUInt16( offset ) );
                offset += 2;
            }
            else
            {
                break;
            }
            if( offset >= value.byteLength )
            {
                break;
            }
        }
    }
    return result;
}

class TEXTURE_FOR_GXD {

constructor(){
    this.Init();
    return this;
}

Init(){
    this.mCheckValidState = FALSE;
    this.mFileDataSize = 0;
    this.mFileData = NULL;
    this.mTexture = NULL;
    this.mTextureInfo = {};
    this.mProcessModeCase = 0;
    this.mAlphaModeCase = 0;
    this.mOrgAlphaModeCase = 0;
    this.mMaterial = NULL;
}

Free(){}

Load( hFile ){
    if ( this.mCheckValidState )
        return FALSE;

    //typedef struct {
    //int mFileDataSize;
    //int tOriginalSize;
    //int tCompressSize;
    //BYTE tCompress[tCompressSize];
    //int mProcessModeCase;
    //int mAlphaModeCase;
    //} TEXTURE_WITH_COMPRESSED;

    //typedef struct {
    //int mFileDataSize;
    //BYTE* mFileData;
    //int mProcessModeCase;
    //int mAlphaModeCase;
    //} TEXTURE_WITH_UNCOMPRESSED;

    var tFileDataSize = CreateInt();
    if ( !ReadFile( hFile, tFileDataSize, 4 ) )
    {
        this.Free();
        return FALSE;
    }
    this.mFileDataSize = tFileDataSize.Data;
    if ( this.mFileDataSize < 1 )
    {
        return TRUE;
    }

    let tOriginalSize = CreateInt();
    let tCompressSize = CreateInt();
    if( !ReadFile( hFile, tOriginalSize, 4 ) )
    {
        this.Free();
        return FALSE;
    }
    if( !ReadFile( hFile, tCompressSize, 4 ) )
    {
        this.Free();s
        return FALSE;
    }
    tOriginalSize = tOriginalSize.Data;
    tCompressSize = tCompressSize.Data;
    console.log( "tOriginalSize = ", tOriginalSize );
    console.log( "tCompressSize = ", tCompressSize );
    
    let tCompress = CreateBYTEArray();
    if( !ReadFile( hFile, tCompress, tCompressSize ) )
    {
        this.Free();
        return FALSE;
    }
    tCompress = tCompress.Data;
    console.log( tCompress );
    let tOriginal = zlib.Decompress( tCompress );
    console.log( tOriginal );
    if( tOriginal.byteLength != tOriginalSize )
    {
        this.Free();
        return FALSE;
    }
    this.mFileData = tOriginal;
    console.log( this.mFileData );

    this.mProcessModeCase = tOriginal.ToInt32( this.mFileDataSize );
    this.mAlphaModeCase = tOriginal.ToInt32( this.mFileDataSize + 4 );

    console.log( "this.mProcessModeCase = ", this.mProcessModeCase );
    console.log( "this.mAlphaModeCase = ", this.mAlphaModeCase );

    var ddsLoader = new DDSLoader();
    var loader = ddsLoader.loadFromBuffer( this.mFileData.ToArrayBuffer( 0, this.mFileData.length ), function ( texture ) {
        //texture.wrapS = 1000;
        texture.wrapT = 1000;
        console.log( texture );
    } );

    this.mMaterial = new MeshBasicMaterial( { map: loader } );
    console.log( this.mMaterial );
    //var material = new MeshBasicMaterial( { map : texture, color: 0xFFFFFF, wireframe: false } );

    this.mCheckValidState = TRUE;

    return TRUE;
}

}

class SKIN_FOR_GXD {

constructor(){
    this.Init();
    return this;
}

Init(){
    this.mCheckValidState = FALSE;
    this.mVertex = NULL;//float*
    this.mNormal = NULL;//float*
    this.mUV = NULL;//float*
    this.mWeight = NULL;//float*
    this.mTris = NULL;//WORD*
    this.mVertexBuffer = NULL;//SKINVERTEX_FOR_GXD
    this.mWeightBuffer = NULL;//SKINWEIGHT_FOR_GXD
    this.mIndexBuffer = NULL;//WORD*
    this.mMotionVertex = NULL;//float*
    this.mMotionNormal = NULL;//float*
    this.mEffect = {};//SKINEFFECT_FOR_GXD
    this.mSize = {};//SKINSIZE_FOR_GXD
    this.mMesh = NULL;
    this.mTexture = new Array(2);
    this.mTexture[0] = new TEXTURE_FOR_GXD();
    this.mTexture[1] = new TEXTURE_FOR_GXD();
}

Free(){  
}

Load( hFile ){

    /*
    typedef struct {
        //int tCheckValid;
        //int tOriginalSize;
        //int tCompressSize;
        //BYTE* tCompressSize;
        //int tOriginalTextureDataSize;
        //int tCompressTextureDataSize
        //BYTE* tTextureData;
    } SKIN_DATA;
    */
   let i;

    if ( this.mCheckValidState )
        return FALSE;
    var tCheckValidState = CreateInt();
    if ( !ReadFile( hFile, tCheckValidState, 4 ) )
    {
        this.Free();
        return FALSE;
    }
    console.log( "SKIN_FOR_GXD.mCheckValidState = " + tCheckValidState.Data );
    this.mCheckValidState = tCheckValidState.Data;
    if ( !this.mCheckValidState )
      return TRUE;
    
    var tOriginalSize = CreateInt();
    var tCompressSize = CreateInt();
    if( !ReadFile( hFile, tOriginalSize, 4 ) )
    {
        this.Free();
        return FALSE;
    }
    if( !ReadFile( hFile, tCompressSize, 4 ) )
    {
        this.Free();
        return FALSE;
    }
    tOriginalSize = tOriginalSize.Data;
    tCompressSize = tCompressSize.Data;
    console.log( "tOriginalSize = ", tOriginalSize );
    console.log( "tCompressSize = ", tCompressSize );

    var tCompress = CreateBYTEArray();
    if( !ReadFile( hFile, tCompress, tCompressSize ) )
    {
        this.Free();
        return FALSE;
    }
    tCompress = tCompress.Data;
    console.log( tCompress );
    var tOriginal = zlib.Decompress( tCompress );
    console.log( tOriginal );
    if( tOriginal.byteLength != tOriginalSize )
    {
        this.Free();
        return FALSE;
    }

    this.mEffect = tOriginal.ToBYTE( 0, 120 );
    this.mVertexNum = tOriginal.ToInt32( 120 );
    this.mUVNum = tOriginal.ToInt32( 124 );
    this.mWeightNum = tOriginal.ToInt32( 128 );
    this.mTrisNum = tOriginal.ToInt32( 132 );
    this.mSize = tOriginal.ToInt32( 136, 40 );

    console.log( "mVertexNum = " + this.mVertexNum );
    console.log( "mUVNum = " + this.mUVNum );
    console.log( "mWeightNum = " + this.mWeightNum );
    console.log( "mTrisNum = " + this.mTrisNum );

    var tOriginalIndex = 176;
    this.mVertexBuffer = ToArray( "float", tOriginal.ToBYTE( tOriginalIndex, 32 * this.mVertexNum ) );
    tOriginalIndex += 32 * this.mVertexNum;
    this.mWeightBuffer = ToArray( "float", tOriginal.ToBYTE( tOriginalIndex, 32 * this.mVertexNum ) );
    tOriginalIndex += 32 * this.mVertexNum;
    this.mIndexBuffer = ToArray( "WORD", tOriginal.ToBYTE( tOriginalIndex, 6 * this.mTrisNum ) );
    tOriginalIndex += 6 * this.mTrisNum;
    this.mMotionVertex = ToArray( "float", tOriginal.ToBYTE( tOriginalIndex, 12 * this.mVertexNum ) );
    tOriginalIndex += 12 * this.mVertexNum;
    this.mMotionNormal = ToArray( "float", tOriginal.ToBYTE( tOriginalIndex, 12 * this.mVertexNum ) );
    tOriginalIndex += 12 * this.mVertexNum;

    var objString = "";
    for( i = 0; i < this.mVertexNum; i++ )
    {
        objString += "v " + this.mVertexBuffer[i * 8 + 0];
        objString += " " + this.mVertexBuffer[i * 8 + 1];
        objString += " " + this.mVertexBuffer[i * 8 + 2] + "\r\n";

        objString += "vn " + this.mVertexBuffer[i * 8 + 3];
        objString += " " + this.mVertexBuffer[i * 8 + 4];
        objString += " " + this.mVertexBuffer[i * 8 + 5] + "\r\n";

        objString += "vt " + this.mVertexBuffer[i * 8 + 6];
        objString += " " + this.mVertexBuffer[i * 8 + 7] + "\r\n";
    }

    for( i = 0; i < this.mTrisNum; i++ )
    {
        objString += "f "+ (this.mIndexBuffer[i*3+0]+1) + "/" + (this.mIndexBuffer[i*3+0]+1) + "/" + (this.mIndexBuffer[i*3+0]+1);
        objString += " " + (this.mIndexBuffer[i*3+1]+1) + "/" + (this.mIndexBuffer[i*3+1]+1) + "/" + (this.mIndexBuffer[i*3+1]+1);
        objString += " " + (this.mIndexBuffer[i*3+2]+1) + "/" + (this.mIndexBuffer[i*3+2]+1) + "/" + (this.mIndexBuffer[i*3+2]+1);
        objString += "\r\n";
    }
    //this.mTexture[0].Init();
    //this.mTexture[1].Init();
    if ( !this.mTexture[0].Load( hFile ) )
    {
        this.Free();
        return FALSE;
    }
    if ( !this.mTexture[1].Load( hFile ) )
    {
        this.Free();
        return FALSE;
    }

    let tTexture1CheckValid = CreateInt();
    if( !ReadFile( hFile, tTexture1CheckValid, 4 ) )
    {
        this.Free();
        return FALSE;
    }
    tTexture1CheckValid = tTexture1CheckValid.Data;
    console.log( "tTexture1CheckValid = ", tTexture1CheckValid);
    
    if ( tTexture1CheckValid > 0 )
    {
        for ( i = 0; i < tTexture1CheckValid; i++ )
        this.mTexture[i].Init();
    }
    for ( i = 0; i < tTexture1CheckValid; i++ )
    {
        if ( !this.mTexture[i].Load( hFile ) )
        {
            this.Free();
            return FALSE;
        }
    }
    //var mBumpTexturemFileDataSize = CreateInt();
    //if ( !ReadFile( hFile, mBumpTexturemFileDataSize, 4 ) )
    //{ 
    //}
    //mBumpTexturemFileDataSize = mBumpTexturemFileDataSize.Data;
    //console.log("mBumpTexturemFileDataSize=",mBumpTexturemFileDataSize);
    //var mBumpTexture = CreateBYTEArray(16);
    //if ( mBumpTexturemFileDataSize > 0 && !ReadFile( hFile, mBumpTexture, 16 ) )
    //{
    //}

    var objLoader = new OBJLoader();
    objLoader.parse( objString );
    var geometry = objLoader.getGeometry();

    //if( this.mTexture[0].mMaterial instanceof MeshBasicMaterial ){
    //    console.log( this.mTexture[0].mMaterial );
        this.mMesh = new Mesh( geometry );
    //}
    //if( this.mTexture[1].mMaterial instanceof MeshBasicMaterial ){
    //    console.log( this.mTexture[1].mMaterial );
        this.mMesh = new Mesh( geometry );
    //}


    this.mCheckValidState = TRUE;

    return TRUE;
}


}

class SOBJECT_FOR_GXD {


constructor(){
    this.Init();
    return this;
}

Init(){
    this.Loader = new FileLoader();
    this.mSkinNum = 0;
    this.mSkin = NULL;
}

Free(){
    if( this.mSkin != NULL )
    {
        for( let i = 0; i < this.mSkinNum; i++ )
        {
            this.mSkin[i].Free();
            this.mSkin[i] = NULL;
        }
        this.mSkin = NULL;
    }
}


Load( tFileName ){
    this.Loader.setResponseType( 'arraybuffer' );
    this.Loader.load( tFileName, function ( object ) {
        //typedef struct{
        //int mSkinNum;
        //SKIN_DATA* mSkin;
        //};
        
        var hFile = new HANDLE( object );
        var tSkinNum = CreateInt();
        if( !ReadFile( hFile, tSkinNum, 4 ) )
        {
            return FALSE;
        }
        this.mSkinNum = tSkinNum.Data;
        console.log( "mSkinNum = ", this.mSkinNum );
        if( this.mSkinNum < 1 )
            return TRUE;
        this.mSkin = new Array( this.mSkinNum );
        if( this.mSkin.length != this.mSkinNum )
            return FALSE;
        for( let i = 0; i < this.mSkinNum; i++ )
        {
            this.mSkin[i] = new SKIN_FOR_GXD();
            this.mSkin[i].Init();
        }
        for( let i = 0; i < this.mSkinNum; i++ )
        {
            if( !this.mSkin[i].Load( hFile ) )
            {
                return FALSE;
            }
            if( this.mSkin[i].mMesh instanceof Mesh )
            {
                if( i > 0 && this.mSkin[0].mTexture[0].mMaterial instanceof MeshBasicMaterial )
                {
                    this.mSkin[i].mMesh.material = this.mSkin[0].mTexture[0].mMaterial; 
                }
                if( this.mSkin[i].mTexture[0].mMaterial instanceof MeshBasicMaterial )
                {
                    this.mSkin[i].mMesh.material = this.mSkin[i].mTexture[0].mMaterial;
                }
                this.mSkin[i].mMesh.position.y = -11;
                this.mSkin[i].mMesh.position.z = -90;
                this.mSkin[i].mMesh.rotation.y = 135;
                GetScene().add( this.mSkin[i].mMesh );
                console.log( `this.mSkin[${i}] = `, hFile );
            }
        }
        return TRUE;
    } );
    return TRUE;
}


}

export { CreateScene, GetScene, CreateCamera, GetCamera, SetCamera, CreateRenderer, GetRenderer, CreateLight, CreateGrid, Update, SKIN_FOR_GXD, SOBJECT_FOR_GXD };
